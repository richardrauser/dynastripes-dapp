

function buildTraitsText(metadata) {
    const attributes = metadata.attributes;

    var traitsText = "";

    const speedAttribute = attributes.filter(trait => trait.trait_type === "speed")[0];
    if (speedAttribute !== undefined) {
      if (traitsText !== "") {
        traitsText += " ";
      }
      traitsText += speedAttribute["value"];            
    }

    const colorAttribute = attributes.filter(trait => trait.trait_type === "color")[0];
    if (colorAttribute !== undefined) {
      if (traitsText !== "") {
        traitsText += " ";
      }
      traitsText += colorAttribute["value"];            
    }

    const formAttribute = attributes.filter(trait => trait.trait_type === "form")[0];
    if (formAttribute !== undefined) {
      if (traitsText !== "") {
        traitsText += " ";
      }
      var form = formAttribute["value"];
      traitsText += form;
    }
    
    return traitsText;
}

export default buildTraitsText;