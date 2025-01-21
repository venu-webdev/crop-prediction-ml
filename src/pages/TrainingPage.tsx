import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Upload, ActivitySquare, BarChart3, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TrainingPage = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [trainingProgress, setTrainingProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [modelMetrics, setModelMetrics] = useState({
        accuracy: 0,
        precision: 0,
        recall: 0,
        f1Score: 0,
    });

    // Sample training history data
    const trainingHistory = [
        { epoch: 1, accuracy: 0.75, loss: 0.45 },
        { epoch: 2, accuracy: 0.82, loss: 0.35 },
        { epoch: 3, accuracy: 0.87, loss: 0.28 },
        { epoch: 4, accuracy: 0.90, loss: 0.22 },
        { epoch: 5, accuracy: 0.92, loss: 0.18 },
    ];

    interface ModelMetrics {
        accuracy: number;
        precision: number;
        recall: number;
        f1Score: number;
    }

    interface FileEvent extends React.ChangeEvent<HTMLInputElement> {
        target: HTMLInputElement & {
            files: FileList;
        };
    }

    const handleFileUpload = (event: FileEvent): void => {
        const file: File = event.target.files[0];
        setSelectedFile(file);

        // Simulate training progress
        let progress: number = 0;
        const interval = window.setInterval(() => {
            progress += 5;
            setTrainingProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setModelMetrics({
                    accuracy: 0.92,
                    precision: 0.89,
                    recall: 0.88,
                    f1Score: 0.90,
                });
            }
        }, 500);
    };

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-4"
            >
                <h1 className="text-4xl font-bold tracking-tight">Model Training</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Upload your dataset and train the model with advanced machine learning algorithms
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
                                <Upload className="w-5 h-5" />
                                Dataset Upload
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="dataset-upload"
                                    />
                                    <label
                                        htmlFor="dataset-upload"
                                        className="cursor-pointer flex flex-col items-center gap-2"
                                    >
                                        <Upload className="w-8 h-8 text-muted-foreground" />
                                        <span className="text-muted-foreground">
                                            Click to upload or drag and drop your dataset (CSV)
                                        </span>
                                        <Button variant="secondary">Select File</Button>
                                    </label>
                                </div>

                                {selectedFile && (
                                    <Alert>
                                        <FileText className="h-4 w-4" />
                                        <AlertTitle>Selected File</AlertTitle>
                                        <AlertDescription>
                                            {selectedFile.name}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {trainingProgress > 0 && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Training Progress</span>
                                            <span>{trainingProgress}%</span>
                                        </div>
                                        <Progress value={trainingProgress} />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ActivitySquare className="w-5 h-5" />
                                Training History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trainingHistory}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="epoch" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="accuracy" stroke="#2F855A" />
                                        <Line type="monotone" dataKey="loss" stroke="#F7B733" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {modelMetrics.accuracy > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                Model Metrics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={[
                                            {
                                                name: 'Metrics',
                                                Accuracy: modelMetrics.accuracy * 100,
                                                Precision: modelMetrics.precision * 100,
                                                Recall: modelMetrics.recall * 100,
                                                'F1 Score': modelMetrics.f1Score * 100,
                                            },
                                        ]}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Accuracy" fill="#2F855A" />
                                        <Bar dataKey="Precision" fill="#63B3ED" />
                                        <Bar dataKey="Recall" fill="#F7B733" />
                                        <Bar dataKey="F1 Score" fill="#8B4513" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
    );
};

export default TrainingPage;