const IUser = props => {
    const { id, username, name, surname, history } = props
    return {
        history: history || null,
        username: username || "",
        surname: surname || "",
        name: name || "",
        id: id || "",
    }
}

export default IUser