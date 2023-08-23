import boxstyles from './Userlist.module.css';
import Card from '../UI/card/Card';

const Userlist = (props) => {

    return (
        <div>


            {props.arraydata.map((obj, index) => (

                < Card className={boxstyles.boxsize} key={index}>
                    <Card className={boxstyles.box}>
                        <p className={boxstyles.content}>{obj.name}{` ( ${obj.age} years old ) `}</p>
                    </Card>
                </Card>

            ))
            }
        </div >

    );

}

export default Userlist;