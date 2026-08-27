import fs from "fs";
const copyResources = () => {
  const resources = {
    models: [
      "Code39ITFDecoder.data",
      "Code128Decoder.data",
      "DataMatrixQRCodeDeblur.data",
      "DataMatrixQRCodeLocalization.data",
      "EAN13Decoder.data",
      "OneDDeblur.data",
      "OneDLocalization.data",
      "PDF417Deblur.data",
      "PDF417Localization.data"
    ],
    templates: ["DBR-PresetTemplates.json"],
    ui: [
      "dce.ui.v5.xml",
      "dce.ui.xml",
      "dls.license.dialog.html",
      "dce.mobile-native.ui.xml"
    ],
    "parser-resources": [
      "AADHAAR.data",
      "AAMVA_DL_ID.data",
      "GS1_AI.data",
      "SOUTH_AFRICA_DL.data",
      "VIN.data"
    ]
  }

  for (const resource in resources) {
    const filenames = resources[resource];
    for (const filename of filenames) {
      fs.cpSync(
        `../DCV_DATA/${resource}/${filename}`,
        `public/${resource}/${filename}`,
      );
    }
  }

  fs.cpSync(
    "../DCV_BUNDLE/src/dcv.bundle.worker.ts",
    `src/dbr.bundle.worker.ts`,
  );
}

export default copyResources;