const mockSubscription = {
    findOne: jest.fn(),
    prototype: {
        save: jest.fn(),
    },
};

function Subscription(data) {
    this.email = data.email;
    this.city = data.city;
    this.frequency = data.frequency;
    this.token = data.token;
    this.confirmed = data.confirmed;
    this.active = true;
    this.save = mockSubscription.prototype.save;
}

module.exports = Subscription;
