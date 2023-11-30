import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {useThrottle} from 'use-throttle'

const SearchBar = ({ queryHandler, suggestion }) => {
  const [text, setText] = useState("");
  const [active, setActive] = useState(0);
  const scrollRef = useRef();

  const handleTextChange = (e) => {
    setText(e.target.value);
    queryHandler(e.target.value);
  };

  const handleActiveSuggestions = (e) => {
    // console.log(e.keyCode)
    // UpArrow = 38
    // DownArrow = 40

    switch (e.keyCode) {
      case 38:
        if (active === 1) {
          scrollRef.current.scrollTop = suggestion.length * 41.88;
          setActive(suggestion.length);
        } else if (active <= suggestion.length - 3) {
          scrollRef.current.scrollTop -= 41.88;
        }

        if (active > 1) {
          setActive((prev) => prev - 1);
        }

        // setActive(prev=>prev-1)
        break;

      case 40:
        if (active === suggestion.length) {
          scrollRef.current.scrollTop = 0;
          setActive(1);
        } else if (active >= 4) {
          scrollRef.current.scrollTop += 41.88;
        }
        if (active < suggestion.length && active != suggestion.length) {
          setActive((prev) => prev + 1);
        }
        break;

      default:
        return;
    }
  };

  // use to update setquery on App js
  const throttleText = useThrottle(text, 1000)
  useEffect(() => {
    queryHandler(throttleText);
  }, [text, queryHandler]);

// //   without throttlling
//   useEffect(() => {
//     queryHandler(text);
//   }, [text, queryHandler]);





  return (
    <Wrapper onKeyUp={handleActiveSuggestions}>
      <SearchBarWrapper>
        <Input
          value={text}
          onChange={handleTextChange}
          placeholder="Search..."
        />
      </SearchBarWrapper>
      <SuggestionBox len={5} active={active} ref={scrollRef}>
        {suggestion?.map((item, index) => {
          return (
            <div onMouseOver={() => setActive(index + 1)} key={index}>
              {item}
            </div>
          );
        })}
      </SuggestionBox>
    </Wrapper>
  );
};

const SuggestionBox = styled.div`
  border: 1px solid red;
  border-top: none;
  display: flex;
  flex-direction: column;
  // max-height: 200px;
  max-height: ${({ len }) => `${len * 41.88}px`};
  margin: auto;
  overflow: auto;
  overflow-y: hidden;

  & * {
    flex: 1;
    text-align: left;
    padding: 10px;
    padding-left: 20px;
  }

  & :nth-child(${({ active }) => active}) {
    background: rgba(0, 0, 0, 0.07);
    cursor: pointer;
  }
`;

const SearchBarWrapper = styled.div`
  border: 1px solid red;
  padding: 5px 10px;
  //   border-top-right-radius:20px;
  //   border-top-left-radius:20px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 22px;
  display: flex;
  flex: 1;
`;

const Wrapper = styled.div`
  max-width: 400px;
  margin: auto;
`;

export default SearchBar;
