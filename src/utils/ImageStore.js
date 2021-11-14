
const UrlPrefixSvg = "DS_TOKEN_IMAGE_URL_PREFIX_SVG_";
const UrlPrefixPng = "DS_TOKEN_IMAGE_SURL_PREFIX_PNG_";


export function getSvgImageUrlForTokenId(tokenId) {
    const svgKey = UrlPrefixSvg + tokenId;
    return localStorage.getItem(svgKey);
}
export function setSvgImageUrlForTokenId(tokenId, svgUrl) {
    const svgKey = UrlPrefixSvg + tokenId;
    return localStorage.setItem(svgKey, svgUrl);
}

export function getPngImageUrlForTokenId(tokenId) {
    const pngKey = UrlPrefixPng + tokenId;
    return localStorage.getItem(pngKey);
}
export function setPngImageUrlForTokenId(tokenId, pngUrl) {
    const pngKey = UrlPrefixPng + tokenId;
    return localStorage.setItem(pngKey, pngUrl);
}

export default getSvgImageUrlForTokenId;
