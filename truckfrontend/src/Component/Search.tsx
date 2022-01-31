type Props = {
    searchmethod: any;
    placeholder: string;
}
const Search = ({searchmethod, placeholder}: Props) =>{
    return(
        <div className="input-container">
            <i className="fas fa-search icon"></i>
            <input placeholder={placeholder}
            type="text"
            onChange={searchmethod}
            className="input-field"
            />


        </div>
    )
}




export default Search;