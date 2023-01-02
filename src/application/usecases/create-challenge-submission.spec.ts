import { InMemoryChallengesRepository } from "../../../tests/repositories/in-memory-challenges-repository";
import { InMemoryStudentsRepository } from "../../../tests/repositories/in-memory-students-repository";
import { Challenge } from "../../domain/entities/challenge";
import { Student } from "../../domain/entities/student";
import { CreateChallengeSubmission } from "./create-challenge-submission";

describe('Create challenge submission use case', () => {
    it('should be able to create a new challenge submission', async () => {
        const studentsRepository = new InMemoryStudentsRepository();
        const challengeRepository = new InMemoryChallengesRepository();

        const student = Student.create({
            name: 'Guilherme',
            email: 'doe@example.com',
        });

        const challenge = Challenge.create({
            title: 'Challenge 01',
            instructionsUrl: 'http://example.com',
        });

        const sut = new CreateChallengeSubmission(
            studentsRepository,
            challengeRepository
        );

        studentsRepository.items.push(student);
        challengeRepository.items.push(challenge);

        const response = await sut.execute({
            studentId: student._id,
            challengeId: challenge._id  
        })

        expect(response).toBeTruthy()
    });
});