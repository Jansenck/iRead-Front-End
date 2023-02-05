import styled from "styled-components";

export default function Logo(props){

    const { height, width } = props;

    return(
        <Image 
            rel="icon"
            className='logo' 
            type="image/svg+xml" 
            src={"./src/assets/iRead-Logo.svg"} 
            height={height} width={width}
        />
    );
}

const Image = styled.img`
    height: ${props => props.height || ''};
    width: ${props => props.width || '280px'};
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
`;