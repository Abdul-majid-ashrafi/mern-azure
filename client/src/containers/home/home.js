import React, { Component } from 'react';
import { setMenuLocally, fetchKitchens } from "../../store/actions";
import { connect } from 'react-redux';
import { HomeComponent } from '../../components';

export class HomeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            kitchens: []
        };
    }
    static getDerivedStateFromProps(props, state) {
        let kitchens = [];
        kitchens = props.kitchens;
        kitchens.sort(function (a, b) {
            if (b.featured || a.featured) {
                return b.featured - a.featured;
            }
            if (b.menu.rating.avg < a.menu.rating.avg) {
                return -1;
            }
            if (b.menu.rating.avg > a.menu.rating.avg) {
                return 1;
            }

        });
        // console.log(kitchens);
        return { kitchens };
    }


    componentDidMount() {
        this.props.fetchKitchens();
    }

    viewKitchen = (kitchen) => {
        this.props.setMenuLocally(kitchen);
    };

    render() {
        return (
            <div>
                <HomeComponent
                    user={this.props.user}
                    kitchens={this.state.kitchens}
                    viewKitchen={this.viewKitchen.bind(this)}
                    isKitchensFetching={this.props.isKitchensFetching}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ auth, supplierKitchens }) => {
    return {
        user: auth.user,
        isKitchensFetching: supplierKitchens.isKitchensFetching,
        kitchens: supplierKitchens.kitchens
    };
};
export default connect(mapStateToProps, { setMenuLocally, fetchKitchens })(HomeContainer);