
import Course1 from './course1.js';


export default function getJSXCourse(courseName, audioData) {

    if(courseName == "course1")

        return <Course1 audioData={audioData}/>;

    else

        return <div>Error</div>
}

