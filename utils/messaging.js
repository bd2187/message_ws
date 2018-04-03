const generateMessage = (sender, message) => {
    return {
        'sender': sender,
        'message': message,
        'time': new Date().getTime()
    }
}

module.exports = generateMessage;