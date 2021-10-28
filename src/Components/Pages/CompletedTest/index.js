import { Row } from 'react-bootstrap';

const CompletedTest = ({ error }) => {
    return (
        <>
            {!error && (
                <Row className="text-center mt-3">
                    <h1>You have completed the test!</h1>
                    <p>Please contact hello@io-academy.uk if you would like to find out your results.</p>
                    <p>We look forward to chatting with you soon.</p>
                </Row>
            )}
            {error && (
                <Row className="text-center mt-3">
                    <h1>Something went wrong!</h1>
                    <p>Please contact hello@io-academy.uk to let them know that your test was not completed.</p>
                    <p>We look forward to chatting with you soon.</p>
                </Row>
            )}
        </>
    );
};

export default CompletedTest;
