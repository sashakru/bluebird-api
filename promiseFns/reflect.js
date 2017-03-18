module.exports = (Bluebird) => {

    Promise.prototype.reflect = async function() {
        try {
            const val = await this;
            return {
                reason() { throw new Error(); }, 
                value() { return val; }, 
                isFulfilled() { return true; },
                isRejected() { return false; }
            };
        } catch (e) {
            return {
                value() { throw new Error("Tried to get value of rejected promise"); },
                reason() { return e; }, 
                isFulfilled() { return false; },
                isRejected() { return true; }
            };
        }
    }
};