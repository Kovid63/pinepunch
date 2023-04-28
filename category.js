export const categories = [
    {
        category_name: "SHEETS",
        type: "Sheet Metal",
        parameters: [
            {
                param_name: "Size",
                predefined: true,
                options: ["2","4","5","6"],
                um: 'na'
            },
            {
                param_name: "Thickness",
                predefined: true,
                options: ["1","2","3"],
                um: 'cm'
            },
            {
                param_name: "Grade",
                predefined: true,
                options: ["A","B","C"],
                um: 'na'
            }
        ],
        description_required: true
    },
    {
        category_name: "PIPE",
        type: "Pipe",
        description_required: true
    },
    {
        category_name: "Section",
        type: "Section",
        description_required: true
    },
    {
        category_name: "Fastness",
        type: "Fastness",
        description_required: true
    },
    {
        category_name: "BOUGHT OUT",
        type: "Bought Out",
        description_required: true
    },
    {
        category_name: "Tools",
        type: "Tools",
        description_required: true
    },
    {
        category_name: "Machinery",
        type: "Machinery",
        parameters: [
            {
                param_name: "Grade",
                predefined: true,
                options: ["A","B","C"],
                um: 'na'
            }
        ],
        description_required: true
    },
    {
        category_name: "Plant",
        type: "Plant",
        parameters: [
            {
                param_name: "Location",
                predefined: false,
            }
        ],
        description_required: true
    },
    {
        category_name: "Others",
        type: "Others",
        description_required: true
    },
]