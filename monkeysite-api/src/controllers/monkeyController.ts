import { Request, Response } from "express";
import Monkey from "../models/monkey";

export const getMonkeys = async (req: Request, res: Response): Promise<void> => {
    try {
        const monkeys = await Monkey.find();
        res.status(200).json({
            success: true,
            count: monkeys.length,
            data: monkeys,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export const getMonkey = async (req: Request, res: Response): Promise<void> => {
    try {
        const monkey = await Monkey.findById(req.params.id);

        if (monkey) {
            res.status(200).json({
                success: true,
                data: monkey,
            });
        } else {
            res.status(404).json({
                success: false,
                error: "Monkey not found!",
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export const createMonkey = async (req: Request, res: Response): Promise<void> => {
    try {
        const monkey = await Monkey.create(req.body);

        res.status(201).json({
            success: true,
            data: monkey,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export const updateMonkey = async (req: Request, res: Response): Promise<void> => {
    try {
        const monkey = await Monkey.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (monkey) {
            res.status(200).json({
                success: true,
                data: monkey,
            });
        } else {
            res.status(404).json({
                success: false,
                error: "Monkey not found!",
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export const deleteMonkey = async (req: Request, res: Response): Promise<void> => {
    try {
        const monkey = await Monkey.findByIdAndDelete(req.params.id);

        if (monkey) {
            res.status(200).json({
                success: true,
                data: {},
            });
        } else {
            res.status(404).json({
                success: false,
                error: "Monkey not found!",
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};