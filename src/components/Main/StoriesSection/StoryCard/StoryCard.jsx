import React, { useState } from 'react';
import cn from 'classnames';
import Stories from 'react-insta-stories';
import Story from '../Story';
import Card from '../Card';

import styles from './StoryCard.module.scss';

const StoryCard = ({ index, isActive, changeSlide, data }) => {
  const [activeStory, setActiveStory] = useState(0);

  const handleStoryChangeNext = () => {
    if (activeStory < data[index].stories.length - 1) {
      setActiveStory(prev => prev + 1);
    } else {
      changeSlide(index + 1);
      setActiveStory(0);
    }
  };

  const handleStoryChangePrev = () => {
    if (activeStory === 0) {
      changeSlide(index - 1);
    } else {
      setActiveStory(prev => prev - 1);
    }
  };

  return (
    <div className={cn(styles.container, isActive && styles.active)} data-num={index}>
      {isActive ? (
        <>
          <Stories
            stories={data[index].stories.map(el => ({
              content: props => {
                return (
                  <div className={styles.wrapper}>
                    <Story
                      title={el.title}
                      text={el.text}
                      media={`${process.env.NEXT_PUBLIC_BASEURL}${el.mediaFile?.image?.url}`}
                      video={`${process.env.NEXT_PUBLIC_BASEURL}${el.mediaFile?.video?.url}`}
                      link={el.link}
                      handleStoryChangePrev={handleStoryChangePrev}
                      handleStoryChangeNext={handleStoryChangeNext}
                      isVideo={el.mediaFile.video}
                    />
                    <div
                      className={cn(styles.leftTrigger, activeStory === 0 && index === 0 && styles.disabled)}
                      onClick={handleStoryChangePrev}
                    ></div>
                    <div
                      className={cn(
                        styles.rightTrigger,
                        activeStory === data[index].stories.length - 1 && index === data.length - 1 && styles.disabled,
                      )}
                      onClick={handleStoryChangeNext}
                    ></div>
                  </div>
                );
              },
            }))}
            defaultInterval={10000}
            width="100%"
            height="100%"
            currentIndex={activeStory}
          />
          <button
            className={cn(styles.btnLeft, activeStory === 0 && index === 0 && styles.disabled)}
            onClick={() => {
              handleStoryChangePrev();
            }}
          ></button>
          <button
            className={cn(
              styles.btnRight,
              activeStory === data[index].stories.length - 1 && index === data.length - 1 && styles.disabled,
            )}
            onClick={() => {
              handleStoryChangeNext();
            }}
          ></button>
        </>
      ) : (
        <div
          onClick={() => {
            setActiveStory(0);
            changeSlide(index);
          }}
        >
          <Card
            title={data[index].title}
            media={`${process.env.NEXT_PUBLIC_BASEURL}${data[index].stories[0].mediaFile?.image?.url}`}
            date="01 декабря 2022"
            isVideo={data[index].stories[0].mediaFile.video}
            isModal
          />
        </div>
      )}
    </div>
  );
};

export default StoryCard;
