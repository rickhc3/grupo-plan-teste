<?php


namespace App\Repositories;


use App\Http\Filters\Filter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Query\Builder;
use JetBrains\PhpStorm\ArrayShape;

class Repository
{
    public Model|Builder $Model;

    public function __construct(Model|Builder $Model)
    {
        $this->Model = $Model;
    }

    public function index(Filter $filter)
    {
        return $this->Model->filter($filter)->paginate($filter->perPage());
    }

    #[ArrayShape(['message' => "string", 'status' => "int", 'data' => "mixed"])]
    public function create(array $data): array
    {
        $resource = $this->Model->create($data);

        return [
            'message' => 'Recurso criado',
            'status' => 201,
            'data' => $resource
        ];
    }

    public function find(int $id, Filter $filter = null): array
    {
        try {
            if($filter == null) {
                $resource = $this->Model->findOrFail($id);
            } else {
                $resource = $this->Model->filter($filter)->findOrFail($id);
            }

            return [
                'message' => 'Recurso encontrado',
                'status' => 200,
                'data' => $resource
            ];
        } catch (ModelNotFoundException $exception) {
            return [
                'message' => 'Recurso não encontrado',
                'error' => $exception->getMessage(),
                'status' => 204,
                'data' => []
            ];
        }
    }

    public function update(array $data, int $id): array
    {
        try {
            $resource = $this->Model->findOrFail($id);
            $resource->update($data);

            return [
                'message' => 'Recurso atualizado',
                'status' => 200,
                'data' => $resource
            ];
        } catch (ModelNotFoundException $exception) {
            return [
                'message' => 'Recurso não encontrado',
                'error' => $exception->getMessage(),
                'status' => 404,
                'data' => []
            ];
        }
    }

    public function delete($id): array
    {
        try {
            $resource = $this->Model->findOrFail($id);

            $resource->delete();

            return [
                'message' => 'Recurso deletado',
                'status' => 204,
                'data' => []
            ];
        } catch (ModelNotFoundException $exception) {
            return [
                'message' => 'Recurso não encontrado',
                'error' => $exception->getMessage(),
                'status' => 204,
                'data' => []
            ];
        }


    }



}
