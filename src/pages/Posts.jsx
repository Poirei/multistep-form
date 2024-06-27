import { Icon } from "@iconify/react";
import { Avatar, Card, Image } from "antd";
import { Link, useLoaderData } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const Posts = () => {
  const data = useLoaderData();
  const posts = (data && data.data) || null;

  const { Meta } = Card;

  console.log(posts);
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {posts?.map(({ id, firstName, lastName, writeup, image, avatar }) => (
          <Card cover={<Image alt="example" src={image} />} key={id}>
            <Meta
              avatar={<Avatar src={avatar} icon={<UserOutlined />} />}
              title={`${firstName} ${lastName}`}
              description={writeup}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Posts;
