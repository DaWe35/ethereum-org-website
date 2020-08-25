import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Twemoji } from "react-emoji-render"

import Button from "./Button"
import Link from "./Link"

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem;
`

const Image = styled(Img)`
  align-self: center;
  width: 100%;
`

const ImageBackground = styled.div`
  background: ${(props) => props.theme.colors.white600};
  width: 100%;
  padding: 2rem;
  text-align: center;
`

const ArtistSubtitle = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.m};
  color: ${(props) => props.theme.colors.text300};
  margin-right: 0.5rem;
`

const Emoji = styled(Twemoji)`
  & > img {
    width: 1.5em !important;
    height: 1.5em !important;
  }
  margin-right: 0.5rem;
`

const Caption = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  width: 100%;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.white700};
  border-radius: 0px 0px 4px 4px;
  padding: 0.5rem 1rem;
`

const ButtonContainer = styled.div`
  margin-top: 1rem;
`

// TODO change to https://ethereum.org
// TODO each item within a row should be same height
const AssetDownload = ({
  title,
  image,
  imageHasBackground = true,
  src,
  artistName,
  artistUrl,
  children,
}) => {
  const downloadUri = src ? src : image.fluid.src
  const downloadUrl = `http://localhost:8888${downloadUri}` // TODO update to ethereum.org

  return (
    <Container>
      <h3>{title}</h3>
      {children && <ImageBackground>{children}</ImageBackground>}
      {!children && imageHasBackground && (
        <ImageBackground>
          <Image fluid={image.fluid} />
        </ImageBackground>
      )}
      {!children && !imageHasBackground && <Image fluid={image.fluid} />}
      {artistName && (
        <Caption>
          <ArtistSubtitle>
            <Emoji svg text=":artist_palette:" />
            Artist:
          </ArtistSubtitle>
          {artistUrl && <Link to={artistUrl}>{artistName}</Link>}
          {!artistUrl && <span>{artistName}</span>}
        </Caption>
      )}
      <ButtonContainer>
        <Button to={downloadUrl}>Download</Button>
      </ButtonContainer>
    </Container>
  )
}

export default AssetDownload
