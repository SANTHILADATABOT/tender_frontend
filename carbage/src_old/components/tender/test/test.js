import {useState, useEffect} from 'react'

const Counter = () =>{
	const [count, setCount] = useState(0);
	const [count1, setCount1] = useState(0);
	

		console.log("Count outside :");
	useEffect( ()=> {
				console.log("Count In effec:"+count);
		},[count,count1]);

	return (
		<div>
		<button onClick={()=>{setCount(count+1)}}>Increse</button>
		<p>Count value is: {count}</p>

		<button onClick={()=>{setCount1(count1+1)}}>Increse 1</button>
		<p>Count 1 value is: {count1}</p>

		
		</div>	
	)
}
export default Counter;