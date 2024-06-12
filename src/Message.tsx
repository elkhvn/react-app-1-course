
// PascalCasing
function Message(){
    const name = 'Elkhan';
    if (name){
        // JSX: JavaScript XML
        return <h1> Hello {name}</h1>;
    }
    return <h1>Hello World</h1>
}

// export: This is an ES6 module syntax used to export functions, objects, or primitive values from a given file (or module). Exporting makes the exported entity available for use in other modules/files.
// default: The default keyword indicates that this is the default export of the module. A module can have only one default export. Default exports are imported without curly braces.

export default Message;
