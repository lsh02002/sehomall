import { Link } from "react-router-dom";
import styled from "styled-components";
import NoImage from "../../assets/no-image.jpg";
import { reviewType } from "../../types/type";
import StarRating from "../StarRating";
import { layout } from "../../them/them";

const ReviewCard = ({ review }: { review: reviewType | null }) => {
  return (
    <Container>
      <TopArea>
        <ItemInfo>
          <Link to={`/detail/${review?.itemId}`}>
            <ProductImage
              src={review?.files?.[0] ? review.files[0].fileUrl : NoImage}
              alt={review?.itemName ?? "review image"}
            />
          </Link>

          <Info>
            <Link to={`/detail/${review?.itemId}`}>
              <ProductName>{review?.itemName}</ProductName>
              <Meta>상품 아이디: {review?.itemId}</Meta>
              <Writer>작성자: {review?.nickname}</Writer>
            </Link>
          </Info>
        </ItemInfo>

        <RatingCount>
          <StarRating totalStars={review?.rating ?? null} />
        </RatingCount>
      </TopArea>

      <Content>
        <Label>Review</Label>
        <p>{review?.content}</p>
      </Content>

      <CreatedDate>등록: {review?.createAt}</CreatedDate>
    </Container>
  );
};

export default ReviewCard;

const Container = styled.div`
  width: 100%;
  max-width: ${layout.maxWidth};

  margin: 16px auto;
  padding: 24px;

  border: 1px solid #eee;
  border-radius: 24px;

  background: #fff;

  box-sizing: border-box;

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.03);

  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);

    box-shadow:
      0 14px 34px rgba(0, 0, 0, 0.07),
      0 4px 12px rgba(0, 0, 0, 0.04);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const TopArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 24px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  min-width: 0;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;

  object-fit: cover;

  border-radius: 20px;

  background: #f5f5f5;

  display: block;

  @media (max-width: 480px) {
    width: 96px;
    height: 96px;
  }
`;

const Info = styled.div`
  min-width: 0;
`;

const ProductName = styled.div`
  margin-bottom: 10px;

  font-size: 20px;
  font-weight: 800;

  color: #111;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Meta = styled.div`
  margin-bottom: 6px;

  font-size: 13px;
  color: #999;
`;

const Writer = styled.div`
  font-size: 14px;
  font-weight: 600;

  color: #555;
`;

const RatingCount = styled.div`
  min-width: 120px;

  display: flex;
  justify-content: flex-end;

  font-size: var(--main-font-size);

  @media (max-width: 640px) {
    justify-content: flex-start;
  }
`;

const Content = styled.div`
  margin-top: 24px;
  padding: 22px;

  border-radius: 20px;

  background: #fafafa;

  font-size: var(--main-font-size);

  p {
    margin: 10px 0 0 0;

    color: #333;

    line-height: 1.7;
  }
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 800;

  letter-spacing: 1px;

  color: #e60023;
`;

const CreatedDate = styled.div`
  margin-top: 16px;

  width: 100%;

  font-size: 13px;
  color: #999;

  text-align: right;
`;
