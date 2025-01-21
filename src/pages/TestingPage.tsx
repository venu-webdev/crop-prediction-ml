import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Brain, Sprout, BarChart3 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TestingPage = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [formData, setFormData] = useState({
        temperature: '',
        humidity: '',
        rainfall: '',
        ph: '',
        nitrogen: '',
        phosphorus: '',
        potassium: '',
    });

    interface PredictionType {
        crop: string;
        confidence: number;
        alternatives: { name: string; probability: number; }[];
    }
    const [prediction, setPrediction] = useState<PredictionType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setPrediction({
                crop: 'Rice',
                confidence: 0.92,
                alternatives: [
                    { name: 'Rice', probability: 0.92 },
                    { name: 'Wheat', probability: 0.05 },
                    { name: 'Maize', probability: 0.03 },
                ]
            });
            setIsLoading(false);
        }, 1500);
    };

    const COLORS = ['#2F855A', '#63B3ED', '#F7B733'];

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-4"
            >
                <h1 className="text-4xl font-bold tracking-tight">Crop Prediction</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Enter environmental parameters to get crop recommendations
                </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Brain className="w-5 h-5" />
                                Input Parameters
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="temperature">Temperature (°C)</Label>
                                        <Input
                                            id="temperature"
                                            name="temperature"
                                            type="number"
                                            step="0.1"
                                            required
                                            value={formData.temperature}
                                            onChange={handleInputChange}
                                            placeholder="Enter temperature"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="humidity">Humidity (%)</Label>
                                        <Input
                                            id="humidity"
                                            name="humidity"
                                            type="number"
                                            step="0.1"
                                            required
                                            value={formData.humidity}
                                            onChange={handleInputChange}
                                            placeholder="Enter humidity"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rainfall">Rainfall (mm)</Label>
                                        <Input
                                            id="rainfall"
                                            name="rainfall"
                                            type="number"
                                            step="0.1"
                                            required
                                            value={formData.rainfall}
                                            onChange={handleInputChange}
                                            placeholder="Enter rainfall"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ph">pH Level</Label>
                                        <Input
                                            id="ph"
                                            name="ph"
                                            type="number"
                                            step="0.1"
                                            required
                                            value={formData.ph}
                                            onChange={handleInputChange}
                                            placeholder="Enter pH level"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nitrogen">Nitrogen (mg/kg)</Label>
                                        <Input
                                            id="nitrogen"
                                            name="nitrogen"
                                            type="number"
                                            required
                                            value={formData.nitrogen}
                                            onChange={handleInputChange}
                                            placeholder="Enter nitrogen content"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phosphorus">Phosphorus (mg/kg)</Label>
                                        <Input
                                            id="phosphorus"
                                            name="phosphorus"
                                            type="number"
                                            required
                                            value={formData.phosphorus}
                                            onChange={handleInputChange}
                                            placeholder="Enter phosphorus content"
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Analyzing...' : 'Predict Crop'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {prediction && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sprout className="w-5 h-5" />
                                    Prediction Results
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Alert>
                                    <Sprout className="h-4 w-4" />
                                    <AlertTitle>Recommended Crop</AlertTitle>
                                    <AlertDescription className="font-semibold text-lg">
                                        {prediction.crop}
                                    </AlertDescription>
                                </Alert>

                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={prediction.alternatives}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="probability"
                                            >
                                                {prediction.alternatives.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold">Confidence Score</h3>
                                    <div className="flex items-center gap-2">
                                        <BarChart3 className="w-4 h-4 text-crop-leaf" />
                                        <span className="text-lg">{(prediction.confidence * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default TestingPage;