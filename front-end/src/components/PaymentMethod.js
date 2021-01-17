import './PaymentMethod.css';
import 'bootstrap/dist/css/bootstrap.css';

let type='Card';
let number=1234;
let expdate='0619';

function PaymentMethod() {
    return (
        <div className="payment">
            <h3>{type}</h3>
            <p>Card Number: **** **** **** {number}</p>
            <p>Valid Through: {expdate.slice(0,2)}/20{expdate.slice(2)}</p>
        </div>
    );
}

export default PaymentMethod;
