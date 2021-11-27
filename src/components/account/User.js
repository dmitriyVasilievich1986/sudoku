const IUser = props => {
    const { username, name, surname } = props
    return {
        username: username || "",
        surname: surname || "",
        name: name || "",
    }
}

export default IUser