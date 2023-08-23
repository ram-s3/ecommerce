import Card from "../UI/card/Card";
import Button from "../UI/button/Button";
import cls from './userform.module.css';
import { useState } from "react";

const Userform = (props) => {

    const [needoverlay, setneedoverlay] = useState(false);

    const formSubmitHandler = (event) => {
        event.preventDefault();


        if (event.target[0].value === '' || event.target[1].value === '') {
            setneedoverlay(true);
        } else if (+event.target[1].value < 0) {
            setneedoverlay(true);
        } else {

            const userinputdata = {
                name: event.target[0].value,
                age: event.target[1].value,
            }
            props.onSaveData(userinputdata);

        }




    }

    const overlayHandler = () => {
        setneedoverlay(false);
    }


    return (
        <div >
            <div className={`${cls.alertbox} ${needoverlay === true ? cls.useoverlay : cls.closeoverlay}`}>
                <div className={cls.alertboxmsg}>
                    <p>invalid user input</p>
                    <Button onClick={overlayHandler}>okay</Button>
                </div>
            </div>
            <Card className={cls.formsize}>

                <form onSubmit={formSubmitHandler}>
                    <label htmlFor="name">name</label>
                    <input id="name" type="text" />
                    <label htmlFor="age">age</label>
                    <input id="age" type="number" />
                    <Button type="submit">
                        save
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default Userform;