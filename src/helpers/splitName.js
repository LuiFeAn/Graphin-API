module.exports = (name) => {

    const convert = name.split("");
    
    let newName = convert.forEach((names)=>{
        return `${names[0].toUpperCase()}`
    })
    return newName;

}