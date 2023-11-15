export class ImageService {
    private readonly randomImageNames: string[] = ["random_1", "random_2", "random_3"];

    getRandomImageName(): string {
        const randomIndex = Math.floor(Math.random() * this.randomImageNames.length);
        return this.randomImageNames[randomIndex];
    }

    getImageName(subject: string): string {
        return subject.toLowerCase();
    }
}