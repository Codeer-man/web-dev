export interface PostListProps {
  posts: Array<{
    id: number;
    title: string;
    description: string;
    slug: string;
    content: string;
    createdAt: Date | null;
    author: {
      name: string;
    };
  }>;
}

export interface PostCardProps {
  post: {
    id: number;
    title: string;
    description: string;
    slug: string;
    content: string;
    createdAt: Date | null;
    author: {
      name: string;
    };
  };
}

export interface postContentProps {
  content: {
    post: {
      id: number;
      title: string;
      description: string;
      slug: string;
      content: string;
      createdAt: Date | null;
      author: {
        name: string;
      };
    };
    isAuthor: boolean;
  };
}
