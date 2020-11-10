import React, { Component } from 'react';
import geolocation from 'geolocation';
import { SearchComponent } from '../../components';
import { sweetalert } from '../../shared';
import { connect } from 'react-redux';
import { searchKitchen, clearSearchResults } from '../../store/actions';

class SearchContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: [],
            days: [],
            locationRange: 5,
            price: { from: 0, to: 0 },
            location: {
                long: '',
                lat: ''
            },
            serving: 0,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (state.category.length || state.days.length || state.price.from || state.price.to || state.serving) {
            // alert('getDerivedStateFromProps')
        }
        return false;
    }


    componentDidMount() {
        geolocation.getCurrentPosition((error, position) => {
            if (error) {
                sweetalert("error", "You can't proceed without atteched location , Please do allow location and reload");
            } else {
                this.setState({
                    location: {
                        ...this.state.location,
                        long: position.coords.longitude,
                        lat: position.coords.latitude,
                    }
                });
            }
        });
    }

    categoryCheckBoxHandler = (values) => {
        if (values.target.value) {
            const newCategory = values.target.value.toLowerCase();
            let category = this.state.category;
            const existingCategory = category.indexOf(newCategory);
            if (existingCategory === -1) {
                category.push(newCategory);
                // category = category;
            } else {
                category.splice(existingCategory, 1);
            }
            this.setState({ category: category });
        }
    };

    dayCheckBoxHandler = (values) => {
        const days = [];
        days.push(values.target.value.toLowerCase());
        this.setState({ days });
    };

    inputHandler = (value) => {
        if (value.target.name === 'priceFrom') {
            this.setState({
                price: { ...this.state.price, from: parseInt(value.target.value) }
            });
        } else if (value.target.name === 'priceTo') {
            this.setState({
                price: { ...this.state.price, to: parseInt(value.target.value) }
            });
        } else {
            this.setState({ [value.target.name]: value.target.value });
        }
    };

    onSearch = (env) => {
        console.log(env.target.value);
        const tags = [];
        tags.push(env.target.value.toLowerCase());
        this.setState({ tags });
    };

    clearState = () => {
        this.setState({
            serving: 0,
            price: { from: 0, to: 0 },
            category: [],
            days: [],
        });
    };

    clearSearchResults = () => {
        this.props.clearSearchResults(this.clearState);
    };

    onContinue = () => {
        // geolocation.getCurrentPosition((error, position) => {
        //     if (error) {
        //         sweetalert("error", "You can't proceed without atteched location , Please do allow location and reload");
        //     } else {
        // this.setState({
        //     location: {
        //         long: position.coords.longitude,
        //         lat: position.coords.latitude,
        //     }
        // });
        if (this.state.location.long && this.state.location.lat) {
            const obj = {
                currentLocation: {
                    long: this.state.location.long,
                    lat: this.state.location.lat,
                },
            };
            if (this.state.category.length) {
                obj.category = this.state.category;
            }
            if (this.state.days.length) {
                obj.days = this.state.days;
            }
            if (this.state.price.from || this.state.price.to) {
                obj.price = this.state.price;
            }
            if (this.state.tags) {
                obj.tags = this.state.tags;
            }
            if (this.state.serving) {
                obj.serving = parseInt(this.state.serving);
            }
            if (this.state.locationRange) {
                obj.locationRange = this.state.locationRange;
            }
            console.log(obj);
            this.props.searchKitchen(obj);
            // }
            // });
        } else {
            sweetalert("error", "You can't proceed without atteched location , Please do allow location and reload");
        }
    };

    location = (value) => {
        this.setState({ locationRange: parseFloat(value.target.value) });
    };

    render() {
        console.log(this.props.isSearchKitchen);
        return (
            <div>
                <SearchComponent
                    categoryCheckBoxHandler={this.categoryCheckBoxHandler.bind(this)}
                    dayCheckBoxHandler={this.dayCheckBoxHandler.bind(this)}
                    inputHandler={this.inputHandler.bind(this)}
                    onContinue={this.onContinue.bind(this)}
                    clearSearchResults={this.clearSearchResults.bind(this)}
                    location={this.location.bind(this)}
                    onSearch={this.onSearch.bind(this)}
                    locationRange={this.state.locationRange}
                    currentLocation={this.state.location}
                    isSearchResultClear={this.props.isSearchResultClear}
                />
            </div>
        );
    }
}

const mapStateToProps = (props) => {
    return {
        isSearchKitchen: props.supplierKitchens.isSearchKitchen,
        isSearchResultClear: props.supplierKitchens.isSearchResultClear
    };
};

export default connect(mapStateToProps, { searchKitchen, clearSearchResults })(SearchContainer);
