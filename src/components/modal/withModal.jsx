import React from "react";
import { Component } from "react";

const withModal = (WrappedComponent, ModalComponent) => {
  return class ChildComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        data: null,
      };
    }

    showModal(data) {
      this.setState({
        show: true,
        data: data,
      });
    }
    closeModal() {
      this.setState({
        show: false,
        data: null,
      });
    }
    render() {
      return (
        <React.Fragment>
          {WrappedComponent && <WrappedComponent showModal={this.showModal} />}
          {this.state.show ? (
            <ModalComponent
              data={this.state.data}
              closeModal={this.closeModal}
            />
          ) : null}
        </React.Fragment>
      );
    }
  };
};

export default withModal;
