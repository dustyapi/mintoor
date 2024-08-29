import React from "react";
import Image from "next/image";
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="12"
    height="12"
    viewBox="0 0 50 50"
    fill="white"
    className="info-icon"
  >
    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
  </svg>
);
const TokenForm: React.FC<any> = ({
  handleInputChange,
  handleImageChange,
  handleSubmit,
  formData,
  tokenImg,
}) => {
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <InfoIcon />
        <p className="hover-text">Name of your token </p>
        <input
          type="text"
          id="name"
          onChange={handleInputChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label>Symbol:</label>
        <InfoIcon />
        <p className="hover-text">Symbol of your token. Eg-BONK. Has to be less than 10 characters </p>
        <input
          type="text"
          id="symbol"
          onChange={handleInputChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <InfoIcon />
        <p className="hover-text">A brief description for your token. </p>
        <input
          type="text"
          id="description"
          onChange={handleInputChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label>Decimals:</label>
        <InfoIcon />
        <p className="hover-text">
          if a token has 9 decimals, it means that the smallest unit of that
          token is 0.000000001 of the whole token.
        </p>
        <input
          type="number"
          min="0"
          max="9"
          id="decimals"
          onChange={handleInputChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label>Tokens to mint:</label>
        <InfoIcon />
        <p className="hover-text">
          If you want to mint 1000 tokens, put 1000 in the field below
        </p>
        <input
          type="text"
          id="tokensToMint"
          onChange={handleInputChange}
          className="form-input"
          required
        />
      </div>
      {/* <div className="form-group">
        <label>Retain Freeze Authority?</label>
        <select
          id="retainFreezeAuth"
          onChange={handleInputChange}
          className="form-input"
          required
        >

          <option value="true" >Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="form-group">
        <label>Retain Mint Authority?</label>
        <select
          id="retainMintAuth"
          onChange={handleInputChange}
          className="form-input"
          required
        >

          <option value="true" >Yes</option>
          <option value="false">No</option>
        </select>
      </div> */}
      <div className="form-group">
        <label>Keep the metadata mutable?</label>
        <InfoIcon />
        <p className="hover-text">
          If you want your tokens metadata to be mutable then choose yes.
          WARNING: SETTING TOKEN METADATA AS IMMUTABLE WILL MAKE IT IMPOSSIBLE
          TO CHANGE IT IN THE FUTURE
        </p>
        <select
          id="mutableMetadata"
          onChange={handleInputChange}
          className="form-input"
          required
          defaultValue={"true"}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className="form-group">
        <label>Image:</label>
        <input
          type="file"
          id="image"
          name="poster"
          accept="image/png, image/jpeg"
          className="form-input"
          onChange={handleImageChange}
          required
        />
      </div>
      <button className="power-btn" type="submit">
        Create Token
      </button>

      <div className="sample-token-container">
        <div className="circular-image-wrapper">
          {!tokenImg?.length ? (
            <div className="shimmer-animation"></div>
          ) : (
            <Image
              src={tokenImg}
              alt={"selected-image"}
              width={80}
              height={80}
              className="circular-image"
            />
          )}
        </div>
        <div className="sample-token-info">
          <h4>{formData?.name}</h4>
          <h5>134.66 {formData?.symbol}</h5>
        </div>
      </div>
    </form>
  );
};

export default TokenForm;
