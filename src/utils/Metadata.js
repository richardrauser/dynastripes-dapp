

export function buildDescriptiveTextFromMetadata(metadata) {
    const attributes = metadata.attributes;

    var descriptiveText = "";

    const formAttribute = attributes.filter(trait => trait.trait_type === "form")[0];
    if (formAttribute !== undefined) {
        var form = formAttribute["value"];
        if (form === "randomish") {
            form = "abstract";
        }
      descriptiveText += form;
    }

    const speedAttribute = attributes.filter(trait => trait.trait_type === "speed")[0];
    if (speedAttribute !== undefined) {
      if (descriptiveText !== "") {
        descriptiveText += ", ";
      }
      descriptiveText += speedAttribute["value"];            
    }

    const colourWayAttribute = attributes.filter(trait => trait.trait_type === "colour way")[0];
    if (colourWayAttribute !== undefined) {
      if (descriptiveText !== "") {
        descriptiveText += ", ";
      }
      descriptiveText += colourWayAttribute["value"];            
    }

    return descriptiveText;

}