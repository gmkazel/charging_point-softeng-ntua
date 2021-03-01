import 'bootstrap/dist/css/bootstrap.css';
import './ReviewStation.css'

let stationname='Station1';
let address='Dimitriadou 13';
let name='group1';

function ReviewStation() {
    return (
        <div className="reviewstation">
            <h3>{stationname}</h3>
            <span>Address: {address}</span>
            <fieldset class="rating">
                <input type="radio" id="star5" name={name} value="5" />
                <label class="full" for="star5" title="Awesome - 5 stars"></label>
                <input type="radio" id="star4half" name={name} value="4.5" />
                <label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                <input type="radio" id="star4" name={name} value="4" />
                <label class="full" for="star4" title="Pretty good - 4 stars"></label>
                <input type="radio" id="star3half" name={name} value="3.5" />
                <label class="half" for="star3half" title="Meh - 3.5 stars"></label>
                <input type="radio" id="star3" name={name} value="3" />
                <label class="full" for="star3" title="Meh - 3 stars"></label>
                <input type="radio" id="star2half" name={name} value="2.5" />
                <label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                <input type="radio" id="star2" name={name} value="2" />
                <label class="full" for="star2" title="Kinda bad - 2 stars"></label>
                <input type="radio" id="star1half" name={name} value="1.5" />
                <label class="half" for="star1half" title="Meh - 1.5 stars"></label>
                <input type="radio" id="star1" name={name} value="1" />
                <label class="full" for="star1" title="Sucks big time - 1 star"></label>
                <input type="radio" id="starhalf" name={name} value="0.5" />
                <label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
            </fieldset>
            <p>Comments (optional):</p>
            <div class="input-group">
                <textarea class="form-control"></textarea>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </div>
    );
}

export default ReviewStation;
