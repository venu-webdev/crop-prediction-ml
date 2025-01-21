import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trees, Brain, LineChart, Leaf } from 'lucide-react';

const algorithms = [
    {
        title: 'Random Forest',
        description: 'Powerful ensemble learning method for large datasets, combining multiple decision trees for improved accuracy and reduced overfitting.',
        icon: Trees,
        features: ['Handles large datasets', 'Prevents overfitting', 'Feature importance ranking']
    },
    {
        title: 'Decision Tree',
        description: 'Intuitive classifier that creates a tree-like model of decisions, perfect for understanding feature relationships.',
        icon: Brain,
        features: ['Easy to interpret', 'Handles numerical & categorical data', 'No data preprocessing required']
    }
];

const HomePage = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-4"
            >
                <div className="inline-block p-2 bg-crop-leaf/10 rounded-full">
                    <Leaf className="w-12 h-12 text-crop-leaf" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">
                    CropSage AI
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Revolutionizing agriculture with intelligent crop prediction using advanced machine learning algorithms
                </p>
            </motion.div>

            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid gap-6 md:grid-cols-2"
            >
                {algorithms.map((algorithm) => (
                    <Card key={algorithm.title} className="overflow-hidden">
                        <CardHeader className="space-y-1">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <algorithm.icon className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">{algorithm.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                {algorithm.description}
                            </p>
                            <ul className="space-y-2">
                                {algorithm.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-crop-leaf" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-card rounded-lg p-8 border"
            >
                <div className="flex items-center gap-4 mb-6">
                    <LineChart className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-semibold">How It Works</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                        <h3 className="font-semibold">1. Data Collection</h3>
                        <p className="text-muted-foreground">
                            Input crucial environmental factors like soil composition, rainfall, temperature, and humidity.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold">2. Model Training</h3>
                        <p className="text-muted-foreground">
                            Our AI models learn patterns from historical crop data to make accurate predictions.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold">3. Prediction</h3>
                        <p className="text-muted-foreground">
                            Get instant, accurate crop recommendations based on your specific conditions.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HomePage;