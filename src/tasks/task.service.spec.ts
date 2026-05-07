
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";
import { Test } from "@nestjs/testing";
import { TaskStatus } from "./task-status.enum";
import { NotFoundException } from "@nestjs/common";



const mockTasksRepository = () => ({
    getAll: jest.fn(),
    getTaskById: jest.fn(),
});

const mockTask = {
    title: "Test title",
    description: "asd",
    id: 1,
    status: TaskStatus.OPEN
};
const mockUser = {
    username: "Nico",
    id: 1,
    password: "somePassword",
    tasks: []
};

describe("TaskService", () => {
    let tasksService: TasksService;
    let tasksRepository: TaskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTasksRepository }
            ],
        }).compile();
        tasksService = module.get<TasksService>(TasksService);
        tasksRepository = module.get<TaskRepository>(TaskRepository);
    });
    describe("getAllTasks", () => {
        it("dammi la risposta di TasksRepository.getAllTasks", async () => {
            (tasksRepository.getAll as jest.Mock).mockResolvedValue([]);
            expect(tasksRepository.getAll).not.toHaveBeenCalled();
            const result = await tasksService.getAllTasks({}, mockUser)
            expect(tasksRepository.getAll).toHaveBeenCalled();
            expect(result).toEqual([]);
        })
    })

    describe("getTaskById", () => {
        it("dammi la risposta del metodo TasksRepository.getTaskById", async () => {
            (tasksRepository.getTaskById as jest.Mock).mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById(1, mockUser);
            expect(tasksRepository.getTaskById).toHaveBeenCalledWith(1, mockUser);
            expect(result).toEqual(mockTask)
        })
        it("dammi gli agganci e gli errori del metodo TasksRepository.getTaskById ", async () => {
            (tasksRepository.getTaskById as jest.Mock).mockResolvedValue(null);
            await expect(
                tasksService.getTaskById(1, mockUser)
            ).rejects.toThrow(NotFoundException);
            expect(tasksRepository.getTaskById).toHaveBeenCalledWith(1, mockUser);
        })
    })
});

