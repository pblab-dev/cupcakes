import React from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import { motion } from 'framer-motion';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'The Art of Cupcake Making',
      excerpt: 'Learn the secrets behind our delicious cupcakes...',
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'Seasonal Flavors: Spring Edition',
      excerpt: 'Discover our new spring-inspired cupcake collection...',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
      date: '2024-03-10'
    },
    {
      id: 3,
      title: 'Decorating Tips & Tricks',
      excerpt: 'Master the art of cupcake decoration with these pro tips...',
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=80',
      date: '2024-03-05'
    }
  ];

  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-5">Blog</h1>
        <Row>
          {posts.map((post) => (
            <Col key={post.id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <img
                  src={post.image}
                  alt={post.title}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <small className="text-muted">
                    {new Date(post.date).toLocaleDateString()}
                  </small>
                  <h5 className="card-title mt-2">{post.title}</h5>
                  <p className="card-text text-muted">{post.excerpt}</p>
                  <button className="btn btn-link px-0">Read More</button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </motion.div>
    </Container>
  );
};

export default Blog;