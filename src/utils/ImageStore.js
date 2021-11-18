import { JsonRpcBatchProvider } from '@ethersproject/providers';
import faunadb from 'faunadb';

const UrlPrefixSvg = "DS_TOKEN_IMAGE_URL_PREFIX_SVG_";
const UrlPrefixPng = "DS_TOKEN_IMAGE_SURL_PREFIX_PNG_";

const ImageStoreCollectionName = "token-image-mapping";
const ImageDataLocalStorageKeyPrefix = "DS_IMAGE_DATA_";
class ImageData {
    constructor(svgUrl, pngUrl) {
        this.svgUrl = svgUrl;
        this.pngUrl = pngUrl;
    }
}
        
class ImageStore {

    constructor() {
        // this.faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
        const dbSecret = "fnAEYFKl59ACSdJVD_HegDQvwQpjrdC6D0FWdYsW";
        this.faunaClient = new faunadb.Client({ secret: dbSecret });
    }

    async fetchImageDataForTokenId(tokenId) {

        try {
            const q = faunadb.query;
            const dbImageJson = await this.faunaClient.query(
                q.Get(
                    q.Match(q.Index('tokens-by-tokenId'), tokenId)
                )
            );
    
            if (dbImageJson !== undefined && dbImageJson !== null) {
                console.log("RETURNED: " + JSON.stringify(dbImageJson));

                const svgUrl = dbImageJson["data"]["svgUrl"];
                const pngUrl = dbImageJson["data"]["pngUrl"];

                if (svgUrl === undefined || svgUrl === null || svgUrl.length < 1 || pngUrl === undefined || pngUrl === null || pngUrl.length < 1) {
                    return null;
                }

                const imageData = new ImageData(svgUrl, pngUrl);    
                return imageData;
            }
    
        } catch (err) {
            console.log("ERROR: " + err);
            return null;
        } 
    }

    setImageDataForTokenId(tokenId, svgUrl, pngUrl) {
        console.log("setting image data for tokenID " + tokenId + " svgUrl " + svgUrl + " pngUrl " + pngUrl);
        const q = faunadb.query;
        this.faunaClient.query(
            q.Create(
              q.Collection(ImageStoreCollectionName),
              { data: { tokenId: tokenId,
                        svgUrl: svgUrl,
                        pngUrl: pngUrl
                } }
            )
          )
          .then((ret) => console.log(ret))
          .catch((err) => console.error('Error: %s', err))

        return new ImageData(svgUrl, pngUrl);
    }
}


export default ImageStore;
