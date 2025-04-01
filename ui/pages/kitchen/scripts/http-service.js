export function createHttpService() {

    const url = 'http://localhost:3000';

    function saveOrder(command) {
        fetch(`${url}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(command.payload),
        })
        .then(command.callback);
    }

    function handleNotification(notification) {
        const actions = {
            'save-order': (command) => saveOrder(command),
        }
        if(actions[notification.type]) {
            actions[notification.type](notification.command)
        }
    }

    return {
        handleNotification,
    };
}