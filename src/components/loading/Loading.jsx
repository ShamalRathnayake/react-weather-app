import React from 'react'
import { RingLoader } from 'react-spinners';
import { css } from "@emotion/core";

const style = {

    loading: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "Translate(-50%, -50%)"
    }
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #000;
`;

const Loading = () => {

    return (
        <div style={style.loading}>
            <div className="sweet-loading">
                <RingLoader
                    css={override}
                    size={50}
                    color={"#7ce5f9"}
                    loading
                />
            </div>
        </div>
    )
}

export default Loading
