import React from 'react';

const UserReelsCard = () => {
  return (
    <div className="w-[15rem] p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <video
          controls
          className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
          src="https://cdn.pixabay.com/video/2024/08/30/228847_tiny.mp4"
        />
      </div>
    </div>
  );
};

export default UserReelsCard;
