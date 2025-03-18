export default function ScoreBoard(props){
    return(
        <h1 className="text-center font-extrabold text-4xl my-4 mt-12 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Score: {props.score}
        </h1>

    )
}