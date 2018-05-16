import React, {Component} from 'react';

export class Weather extends Component {
  render() {
    return (
      <div className='weather__info'>
      {/*if this.props.city AND this.props.country return true and (and only then) do we render out/display the paragraph*/}

      {
        this.props.city && this.props.country && <p className="weather__key">Location:
          <span className="weather__value"> {this.props.city}, {this.props.country}</span>
        </p>
      }
      {
        this.props.temperature && <p className="weather__key">Temperature:
          <span className="weather__value"> {this.props.temperature}</span>
        </p>
      }
      {
        this.props.humidity && <p className="weather__key">Humidity:
          <span className="weather__value"> {this.props.humidity}</span>
        </p>
      }
      {
        this.props.description && <p className="weather__key">Conditions:
          <span className="weather__value"> {this.props.description}</span>
        </p>
      }
      {
        this.props.error && <p className="weather__error">{this.props.error}</p>
      }
      </div>
    );
  }
}
