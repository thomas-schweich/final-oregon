var inventory = {
    oxen: Number,
    ammunition: Number
}

var player = {
    name: String,
    location: String,
    status: String,
    inventory: {
        oxen: Number,
        ammunition: Number
    },
    party: [],
    offers: [
        {
            name: String,
            request: {
                item: String,
                amount: Number
            },
            uid: String
        },
    ],
    nearby: [
        {   
            uid: String,
            inventory: {
                oxen: Number,
                ammunition: Number
            }
        },
    ]
}
