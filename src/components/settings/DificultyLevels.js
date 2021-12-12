const DificultyLevels = [
    { value: "1", text: "Тест" },
    { value: "20", text: "Легкий", },
    { value: "40", text: "Средний", },
    { value: "50", text: "Тяжелый", },
    { value: "60", text: "Максимальный", },
].filter(d => d.value == "1" ? process.env.NODE_ENV == "development" : true)

export default DificultyLevels