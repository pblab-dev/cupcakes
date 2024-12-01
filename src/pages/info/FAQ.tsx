import React from 'react';
import { Container, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import { motion } from 'framer-motion';

const FAQ = () => {
  const [open, setOpen] = React.useState<string>('1');
  const toggle = (id: string) => {
    open === id ? setOpen('') : setOpen(id);
  };

  const faqs = [
    {
      id: '1',
      question: 'How long do your cupcakes stay fresh?',
      answer: 'Our cupcakes are best enjoyed within 2-3 days of purchase when stored properly at room temperature in an airtight container.'
    },
    {
      id: '2',
      question: 'Do you offer custom orders?',
      answer: 'Yes! We accept custom orders for special events with at least 48 hours notice. Please contact us for details.'
    },
    {
      id: '3',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and Apple Pay.'
    },
    {
      id: '4',
      question: 'Do you offer gluten-free options?',
      answer: 'Yes, we have a selection of gluten-free cupcakes available daily. Please note that they are prepared in a facility that also handles wheat products.'
    },
    {
      id: '5',
      question: 'What is your cancellation policy?',
      answer: 'Orders can be cancelled up to 24 hours before the scheduled delivery time for a full refund.'
    }
  ];

  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-5">Frequently Asked Questions</h1>
        
        <Accordion open={open} toggle={toggle}>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id}>
              <AccordionHeader targetId={faq.id}>
                {faq.question}
              </AccordionHeader>
              <AccordionBody accordionId={faq.id}>
                {faq.answer}
              </AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Container>
  );
};

export default FAQ;