import {useEffect} from "react";
import Cookies from 'js-cookie';
import axios from 'axios';


function UserGreeting(props) {
	useEffect(()=>{
		async function statusUpdate(){
			try{
				await axios.post('/status',{token:Cookies.get('jwttttt'),index:Cookies.get('quizNumber')});
				Cookies.remove('quizNumber');
			}
			catch(e){
				console.log(e);
			}
			
		}
		statusUpdate();
	},[]);
	return (
		<div>
			<h2>Thank's for completing the quiz</h2>
			<p>
				Status:{" "}
				{props.correctScore >= 2
					? "You passed the quiz"
					: "Unfortunately you are failed"}
			</p>
		</div>
	);
}

export default UserGreeting;
