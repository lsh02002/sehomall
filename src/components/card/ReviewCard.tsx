import { Link } from "react-router-dom";
import styled from "styled-components";
import NoImage from "../../assets/no-image.jpg";
import { reviewType } from "../../types/type";
import StarRating from "../StarRating";

const ReviewCard = ({ review }: { review: reviewType | null }) => {
  return (
    <Container>
      <ItemInfo>
        <Link to={`/detail/${review?.itemId}`}>
          <img
            src={review?.files[0] ? review.files[0].fileUrl : NoImage}
            alt=""
          />
        </Link>
        <Info>
          <Link to={`/detail/${review?.itemId}`}>
            <div>상품 아이디: {review?.itemId}</div>
            <div>상품 명: {review?.itemName}</div>
            <div>작성자: {review?.nickname}</div>
          </Link>
        </Info>
      </ItemInfo>
      <ContentGroup>
      <Content>
        <div>내용: {review?.content}</div>
      </Content>
      <RatingCount>
        <StarRating totalStars={review?.rating ?? null} />
      </RatingCount>
      </ContentGroup>
      <CreatedDate>등록: {review?.createAt}</CreatedDate>
    </Container>
  );
};

export default ReviewCard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 870px;
  width: 100%;
  /* overflow: hidden; */
  box-sizing: border-box;
  padding: 5px;
  margin: 20px 0;
  position: relative;
  border: 1px solid lightgray;

  img {
    width: 150px;
    height: 150px;
    padding: 0px 10px;
    object-fit: contain;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Info = styled.div`
  padding: 5px;
  width: 300px;
  font-size: var(--main-font-size);
`;

const ContentGroup = styled.div`  
  display: flex;
  justify-content: space-between;  
  width: 100%;
`;

const Content = styled.div`
  padding-left: 40px;
  padding-right: 25px;
  text-align: left;
  width: 100%;
  font-size: var(--main-font-size);
`;

const RatingCount = styled.div`
  width: 100px;
  text-align: right;
  font-size: var(--main-font-size);
`;

const CreatedDate = styled.div`
  width: 100%;
  font-size: var(--main-font-size);
`;
