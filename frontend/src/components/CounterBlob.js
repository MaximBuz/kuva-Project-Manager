import styled from 'styled-components';

const CounterBlobWrapper = styled.div`
    background-color: #FF0ABA;
    color: white;
    width: 17px;
    height: 17px;
    padding: 5px;
    border-radius: 100000px;
    display:flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 0em;
`

function CounterBlob(props) {

    const count = props.count;
    
    return (
        <CounterBlobWrapper>
           <p>{count}</p>
        </CounterBlobWrapper>
    );
  }
  
  export default CounterBlob;