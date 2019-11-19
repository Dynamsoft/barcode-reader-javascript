// AAMVA2016, driver license abbreviation-description map
const DLAbbrDesMap = {
    'DCA': 'Jurisdiction-specific vehicle class',
    'DCB': 'Jurisdiction-specific restriction codes',
    'DCD': 'Jurisdiction-specific endorsement codes',
    'DBA': 'Document Expiration Date',
    'DCS': 'Customer Last Name',
    'DAC': 'Customer First Name',
    'DBD': 'Document Issue Date',
    'DBB': 'Date of Birth',
    'DBC': 'Physical Description – Sex',
    'DAY': 'Physical Description – Eye Color',
    'DAU': 'Physical Description – Height',
    'DAG': 'Address – Street 1',
    'DAI': 'Address – City',
    'DAJ': 'Address – Jurisdiction Code',
    'DAK': 'Address – Postal Code',
    'DAQ': 'Customer ID Number',
    'DCF': 'Document Discriminator',
    'DCG': 'Country Identification',
    'DDE': 'Family Name Truncation',
    'DDF': 'First Names Truncation',
    'DDG': 'Middle Names Truncation',
    'DAH': 'Address – Street 2',
    'DAZ': 'Hair Color',
    'DCI': 'Place of birth',
    'DCJ': 'Audit information',
    'DCK': 'Inventory Control Number',
    'DBN': 'Alias / AKA Family Name',
    'DBG': 'Alias / AKA Given Name',
    'DBS': 'Alias / AKA Suffix Name',
    'DCU': 'Name Suffix',
    'DCE': 'Physical Description Weight Range',
    'DCL': 'Race / Ethnicity',
    'DCM': 'Standard vehicle classification',
    'DCN': 'Standard endorsement code',
    'DCO': 'Standard restriction code',
    'DCP': 'Jurisdiction-specific vehicle classification description',
    'DCQ': 'Jurisdiction-specific endorsement code description',
    'DCR': 'Jurisdiction-specific restriction code description',
    'DDA': 'Compliance Type',
    'DDB': 'Card Revision Date',
    'DDC': 'HazMat Endorsement Expiration Date',
    'DDD': 'Limited Duration Document Indicator',
    'DAW': 'Weight(pounds}',
    'DAX': 'Weight(kilograms}',
    'DDH': 'Under 18 Until',
    'DDI': 'Under 19 Until',
    'DDJ': 'Under 21 Until',
    'DDK': 'Organ Donor Indicator',
    'DDL': 'Veteran Indicator',
    // old standard
    'DAA': 'Customer Full Name',
    'DAB': 'Customer Last Name',
    'DAE': 'Name Suffix',
    'DAF': 'Name Prefix',
    'DAL': 'Residence Street Address1',
    'DAM': 'Residence Street Address2',
    'DAN': 'Residence City',
    'DAO': 'Residence Jurisdiction Code',
    'DAP': 'Residence Postal Code',
    'DAR': 'License Classification Code',
    'DAS': 'License Restriction Code',
    'DAT': 'License Endorsements Code',
    'DAV': 'Height in CM',
    'DBE': 'Issue Timestamp',
    'DBF': 'Number of Duplicates',
    'DBH': 'Organ Donor',
    'DBI': 'Non-Resident Indicator',
    'DBJ': 'Unique Customer Identifier',
    'DBK': 'Social Security Number',
    'DBL': 'Date Of Birth',
    'DBM': 'Social Security Number',
    'DCH': 'Federal Commercial Vehicle Codes',
    'DBO': 'Customer Last Name',
    'DBP': 'Customer First Name',
    'DBQ': 'Customer Middle Name(s}',
    'DBR': 'Name Suffix',
    'PAA': 'Permit Classification Code',
    'PAB': 'Permit Expiration Date',
    'PAC': 'Permit Identifier',
    'PAD': 'Permit IssueDate',
    'PAE': 'Permit Restriction Code',
    'PAF': 'Permit Endorsement Code',
    'ZVA': 'Court Restriction Code',
    'DCT': 'Customer First Name',
    'DAD': 'Customer Middle Name(s}'
};

// Get driver license abbreviation-content map from raw txt
var parseDriverLicense = txt => {
    let lines = txt.split('\n');
    let abbrs = Object.keys(DLAbbrDesMap);
    let map = {};
    lines.forEach((line, i) => {
        let abbr;
        let content;
        if(i === 1){
            abbr = 'DAQ';
            content = line.substring(line.indexOf(abbr) + 3);
        }else{
            abbr = line.substring(0, 3);
            content = line.substring(3).trim();
        } 
        if(abbrs.includes(abbr)){
            map[abbr] = {
                description: DLAbbrDesMap[abbr],
                content: content
            };
        }
    });
    return map;
};
