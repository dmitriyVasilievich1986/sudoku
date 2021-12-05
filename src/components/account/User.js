const IUser = props => {
    const { id, username, name, surname } = props
    return {
        username: username || "",
        surname: surname || "",
        name: name || "",
        id: id || "",
    }
}

export default IUser