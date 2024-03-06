import React from 'react'
import {
    MDBRow as Row,
    MDBCol as Col,
    MDBCard as Card,
    MDBCardBody as CardBody,
} from 'mdb-react-ui-kit';
import Header from '../components/Layouts/Header';
import Sidebar from '../components/Layouts/Sidebar';
const Gmaps = () => {
    return (
        <>
            <Header sticky />
            <div className="custom-homepage my-5">
                <div className="custom-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2">
                                <Sidebar />
                            </div>
                            <Col md={10}>
                                <Card>
                                    <CardBody>
                                        <div style={{ width: '100%' }}><iframe width="100%" height={600} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=MTI%20University%20Administration+(TUP%20TAGUIG%20CLINIC)&t=k&z=14&ie=UTF8&iwloc=B&output=embed">&lt;a href="https://www.gps.ie/"&gt;gps vehicle tracker&lt;/a&gt;</iframe></div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gmaps
